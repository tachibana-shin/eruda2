import { detectBrowser, detectOs, escape } from '../lib/util'

const browser = detectBrowser()

export default [
  {
    name: 'Screen Type',
    val() {
      return `
        <button class="eruda-change-device" data-width="device-width"> Auto </button>
        <button class="eruda-change-device" data-width="575"> (xs) </button>
        <button class="eruda-change-device" data-width="576"> (sm) </button>
        <button class="eruda-change-device" data-width="768"> (md) </button>
        <button class="eruda-change-device" data-width="992"> (lg) </button>
        <button class="eruda-change-device" data-width="1200"> (xl) </button>
      `
    }
  },
  {
    name: 'Location',
    val() {
      return escape(location.href)
    },
  },
  {
    name: 'User Agent',
    val: navigator.userAgent,
  },
  {
    name: 'Device',
    val: [
      '<table><tbody>',
      `<tr><td class="eruda-device-key">screen</td><td>${screen.width} * ${screen.height}</td></tr>`,
      `<tr><td>viewport</td><td>${window.innerWidth} * ${window.innerHeight}</td></tr>`,
      `<tr><td>pixel ratio</td><td>${window.devicePixelRatio}</td></tr>`,
      '</tbody></table>',
    ].join(''),
  },
  {
    name: 'System',
    val: [
      '<table><tbody>',
      `<tr><td class="eruda-system-key">os</td><td>${detectOs()}</td></tr>`,
      `<tr><td>browser</td><td>${
        browser.name + ' ' + browser.version
      }</td></tr>`,
      '</tbody></table>',
    ].join(''),
  },
  {
    name: 'About',
    val: '<a href="https://github.com/liriliri/eruda" target="_blank">Eruda v' +
      VERSION +
      '</a>',
  },
]