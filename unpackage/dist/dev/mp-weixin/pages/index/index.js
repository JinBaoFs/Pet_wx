"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const CustomTabbar = () => "../../components/custom-tabbar.js";
const _sfc_main = {
  components: { CustomTabbar },
  data() {
    return {
      statusBarHeight: 0,
      list: [
        {
          url: "/static/tabbar/list-01.png"
        },
        {
          url: "/static/tabbar/list-02.png"
        }
      ]
    };
  },
  onLoad() {
    const info = common_vendor.index.getSystemInfoSync();
    this.statusBarHeight = info.statusBarHeight;
    this.getOrders();
  },
  methods: {
    getOrders() {
      common_vendor.index.request({
        url: "http://192.168.31.14:3000/api/orders/listAll",
        method: "GET",
        success: (res) => {
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
        }
      });
    }
  }
};
if (!Array) {
  const _component_custom_tabbar = common_vendor.resolveComponent("custom-tabbar");
  _component_custom_tabbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: $data.statusBarHeight + "px",
    c: common_vendor.f($data.list, (item, idx, i0) => {
      return {
        a: item.url,
        b: idx
      };
    }),
    d: common_vendor.p({
      current: 0
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
