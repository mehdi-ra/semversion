export function versionMiddlewareApplier(
  version: string,
  middlewares: ((v: string) => string)[]
): string {
  if (middlewares.length <= 0) {
    return version
  }

  let modifiedVersion = version

  for (const middleware of middlewares) {
    modifiedVersion = middleware(modifiedVersion)
  }

  return modifiedVersion
}
