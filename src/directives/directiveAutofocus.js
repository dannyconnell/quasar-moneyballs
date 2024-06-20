import { Platform } from 'quasar'

export default {
  mounted(el) {
    const input = el.querySelector('input'),
          delay = Platform.is.capacitor ? 500 : 0

    setTimeout(() => {
      input.focus()
    }, delay)
  }
}