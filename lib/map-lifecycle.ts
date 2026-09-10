/** Own one asynchronously loaded map, including late imports and failed setup. */
export function startMapLifecycle<Library, Map>({
  load,
  create,
  configure,
  dispose,
  onError,
}: {
  load: () => Promise<Library>
  create: (library: Library) => Map
  configure: (map: Map, library: Library, fail: (error: unknown) => void) => void
  dispose: (map: Map) => void
  onError: (error: unknown) => void
}): () => void {
  let stopped = false
  let current: Map | undefined

  const stop = () => {
    if (stopped) return
    stopped = true
    const map = current
    current = undefined
    if (map !== undefined) dispose(map)
  }

  const fail = (error: unknown) => {
    if (stopped) return
    try {
      stop()
    } finally {
      onError(error)
    }
  }

  void Promise.resolve().then(load).then((library) => {
    if (stopped) return
    current = create(library)
    configure(current, library, fail)
  }).catch(fail)

  return stop
}
