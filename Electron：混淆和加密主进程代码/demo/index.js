/*
 * @Author: SHEN
 * @Date: 2020-11-13 10:34:01
 * @Last Modified by:   SHEN
 * @Last Modified time: 2020-11-13 10:34:01
 */

if (process.env.NODE_ENV === 'development') {
  require('./src/main.js');
} else {
  require('bytenode')
  require('./dist-obf/main.jsc');
}
