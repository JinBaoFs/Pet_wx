"use strict";
const common_vendor = require("../../common/vendor.js");
const CustomTabbar = () => "../../components/custom-tabbar.js";
const _sfc_main = {
  components: {
    CustomTabbar
  },
  data() {
    return {};
  },
  methods: {}
};
if (!Array) {
  const _component_custom_tabbar = common_vendor.resolveComponent("custom-tabbar");
  _component_custom_tabbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      current: 1
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
