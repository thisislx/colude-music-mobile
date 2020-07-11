import { createGlobalStyle } from 'styled-components'

export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1585032990868'); /* IE9 */
  src: url('./iconfont.eot?t=1585032990868#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('./iconfont.woff?t=1585032990868') format('woff'),
  url('./iconfont.ttf?t=1585032990868') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./iconfont.svg?t=1585032990868#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-danquxunhuan:before {
  content: "\e607";
}

.icon-suiji:before {
  content: "\e60a";
}

.icon-danxunhuan:before {
  content: "\e61c";
}

.icon-List:before {
  content: "\e604";
}

.icon-Next:before {
  content: "\e8c5";
}

.icon-Previous:before {
  content: "\e8c6";
}

.icon-pause:before {
  content: "\e723";
}

.icon-play:before {
  content: "\e726";
}

.icon-increase:before {
  content: "\e69f";
}

.icon-upward:before {
  content: "\e6a1";
}

.icon-back:before {
  content: "\e6db";
}

.icon-cancel:before {
  content: "\e6dc";
}

.icon-close:before {
  content: "\e6dd";
}

.icon-aixin:before {
  content: "\e8ab";
}

.icon-dianzan:before {
  content: "\e8ad";
}

.icon-gengduo:before {
  content: "\e8af";
}

.icon-sousuo:before {
  content: "\e8b9";
}

.icon-taolunqu:before {
  content: "\e8ba";
}


`

