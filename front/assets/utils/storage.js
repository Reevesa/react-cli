/**
 * @overview: Storage util.
 * @author: Tower 
 * @created: 2018-01-11 16:46:46 
 */

export default {
  set(key, val) {
    try {
      const val_str = JSON.stringify(val || {});
      window.sessionStorage.setItem('$' + key, val_str);
    }
    catch (e) {
      console.log(`Utils storage api <set> error: ${e}`);
    }
  },

  get(key) {
    try {
      const val = window.sessionStorage.getItem('$' + key) || '{}';
      return JSON.parse(val);
    }
    catch (e) {
      console.log(`Utils storage api <get> error: ${e}`);
    }
  },

  setLocal(key, val) {
    try {
      const val_str = JSON.stringify(val || {});
      window.localStorage.setItem('$' + key, val_str);
    }
    catch (e) {
      console.log(`Utils storage api <setLocal> error: ${e}`);
    }
  },

  getLocal(key) {
    try {
      const val = window.localStorage.getItem('$' + key);
      return val ? JSON.parse(val) : '';
    }
    catch (e) {
      console.log(`Utils storage api <getLocal> error: ${e}`);
    }
  },

  delLocal(key) {
    try {
      return window.localStorage.removeItem('$' + key);
    }
    catch (e) {
      console.log(`Utils storage api <delLocal> error: ${e}`);
    }
  }
};