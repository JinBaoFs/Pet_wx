"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  name: "custom-tabbar",
  props: {
    current: Number
  },
  data() {
    return {};
  },
  methods: {
    switchTab(url) {
      common_vendor.index.switchTab({
        url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.n($props.current === 0 ? "tabbar-item-active" : ""),
    c: common_vendor.o(($event) => $options.switchTab("/pages/index/index")),
    d: common_assets._imports_1,
    e: common_vendor.n($props.current === 1 ? "tabbar-item-active" : ""),
    f: common_vendor.o(($event) => $options.switchTab("/pages/care/index")),
    g: common_assets._imports_2,
    h: common_vendor.n($props.current === 2 ? "tabbar-item-active" : ""),
    i: common_vendor.o(($event) => $options.switchTab("/pages/profile/index"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
