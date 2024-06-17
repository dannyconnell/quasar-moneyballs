import { Dark } from 'quasar'

export function useLightOrDark(lightString, darkString) {
  return !Dark.isActive ? lightString : darkString
}