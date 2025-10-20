"use strict";
const common_vendor = require("../../common/vendor.js");
const CustomTabbar = () => "../../components/custom-tabbar.js";
const _sfc_main = {
  components: {
    CustomTabbar
  },
  data() {
    return {
      user: {
        avatar: "/static/avatar.png",
        nickname: "点击登录"
      },
      orderList: [
        {
          icon: "/static/order/daifukuan.png",
          text: "待付款"
        },
        {
          icon: "/static/order/daifahuo.png",
          text: "待发货"
        },
        {
          icon: "/static/order/daishouhuo.png",
          text: "待收货"
        },
        {
          icon: "/static/order/daipingjia.png",
          text: "待评价"
        }
      ],
      menuList: [
        {
          icon: "/static/menu/address.png",
          text: "收货地址",
          action: () => common_vendor.index.navigateTo({
            url: "/pages/address/index"
          })
        },
        {
          icon: "/static/menu/service.png",
          text: "联系客服",
          action: () => common_vendor.index.makePhoneCall({
            phoneNumber: "10086"
          })
        },
        {
          icon: "/static/menu/about.png",
          text: "关于我们",
          action: () => common_vendor.index.navigateTo({
            url: "/pages/about/index"
          })
        }
      ]
    };
  },
  methods: {
    goToOrders() {
      common_vendor.index.navigateTo({
        url: "/pages/order/list"
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
    a: $data.user.avatar,
    b: common_vendor.t($data.user.nickname),
    c: common_vendor.o((...args) => $options.goToOrders && $options.goToOrders(...args)),
    d: common_vendor.f($data.orderList, (item, k0, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.text),
        c: item.text
      };
    }),
    e: common_vendor.f($data.menuList, (item, k0, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.text),
        c: item.text,
        d: common_vendor.o(item.action, item.text)
      };
    }),
    f: common_vendor.p({
      current: 2
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-201c0da5"]]);
wx.createPage(MiniProgramPage);
