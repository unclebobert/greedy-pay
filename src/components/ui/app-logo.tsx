import logoUrl from '/unclebob.png'

export function AppLogo(props: React.ComponentProps<"img">) {
  return <img src={logoUrl} {...props} />
}
