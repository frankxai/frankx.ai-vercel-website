import { kv } from '@vercel/kv'

import type {
  TallinnCaptureIdempotency,
  TallinnReservationState,
} from '@/lib/tallinn-interest/service'

const PENDING_TTL_SECONDS = 15 * 60
const COMPLETED_TTL_SECONDS = 180 * 24 * 60 * 60
const KEY_PREFIX = 'tallinn-interest:v1:'

const COMPLETE_IF_OWNER_LUA = `
local current = redis.call('GET', KEYS[1])
if not current then return 0 end
local ok, decoded = pcall(cjson.decode, current)
if not ok then return 0 end
if decoded['status'] == 'completed' then return 1 end
if decoded['token'] ~= ARGV[1] then return 0 end
redis.call('SET', KEYS[1], ARGV[2], 'EX', ARGV[3])
return 1
`

const RECOVER_COMPLETED_LUA = `
local current = redis.call('GET', KEYS[1])
if not current then return 0 end
local ok, decoded = pcall(cjson.decode, current)
if not ok then return 0 end
redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2])
return 1
`

function reservationKey(sourceKey: string) {
  return `${KEY_PREFIX}${sourceKey}`
}

function completedState(
  token: string,
  recordId: string | undefined,
  completedAt: string,
): TallinnReservationState {
  return {
    status: 'completed',
    token,
    recordId,
    completedAt,
  }
}

export function createVercelKvTallinnCaptureIdempotency(): TallinnCaptureIdempotency {
  return {
    async reserve(sourceKey, token, startedAt) {
      const state: TallinnReservationState = {
        status: 'pending',
        token,
        startedAt,
      }
      const result = await kv.set(reservationKey(sourceKey), state, {
        nx: true,
        ex: PENDING_TTL_SECONDS,
      })
      return result === 'OK'
    },

    async get(sourceKey) {
      return kv.get<TallinnReservationState>(reservationKey(sourceKey))
    },

    async complete(sourceKey, token, recordId, completedAt) {
      const state = completedState(token, recordId, completedAt)
      const result = await kv.eval<[string, string, number], number>(
        COMPLETE_IF_OWNER_LUA,
        [reservationKey(sourceKey)],
        [token, JSON.stringify(state), COMPLETED_TTL_SECONDS],
      )
      return result === 1
    },

    async recover(sourceKey, token, recordId, completedAt) {
      const state = completedState(token, recordId, completedAt)
      const result = await kv.eval<[string, number], number>(
        RECOVER_COMPLETED_LUA,
        [reservationKey(sourceKey)],
        [JSON.stringify(state), COMPLETED_TTL_SECONDS],
      )
      return result === 1
    },
  }
}
