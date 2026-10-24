/** Only the most recently started request may change the displayed reporting window. */
export function createLatestRequest() {
  let sequence = 0
  return async function run<T>(load: () => Promise<T>, callbacks: {
    commit: (value: T) => void
    fail: () => void
    settled?: () => void
  }): Promise<void> {
    const current = ++sequence
    try {
      const value = await load()
      if (current === sequence) callbacks.commit(value)
    } catch {
      if (current === sequence) callbacks.fail()
    } finally {
      if (current === sequence) callbacks.settled?.()
    }
  }
}
