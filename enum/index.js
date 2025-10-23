export function createOptions(enumObj, textMap) {
  return Object.keys(enumObj).map(key => ({
    label: textMap[enumObj[key]],
    value: enumObj[key]
  }))
}

// 订单状态枚举
export const ORDER_STATUS = {
  PENDING: 0, // 待支付
  PAID: 1,    // 已支付
  SHIPPED: 2, // 已发货
  FINISHED: 3,// 已完成
  CANCELED: 4 // 已取消
}

// 状态对应显示文字
export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.PENDING]: '待支付',
  [ORDER_STATUS.PAID]: '已支付',
  [ORDER_STATUS.SHIPPED]: '已发货',
  [ORDER_STATUS.FINISHED]: '已完成',
  [ORDER_STATUS.CANCELED]: '已取消'
}

// 订单Options
export const ORDER_STATUS_OPTIONS = createOptions(ORDER_STATUS, ORDER_STATUS_TEXT)


// 性别枚举
export const GENDER_STATUS = {
	MALE: 1,
	FEMALE: 2
} 

// 性别枚举显示文字
export const GENDER_STATUS_TEXT = {
	[GENDER_STATUS.MALE]: '公',
	[GENDER_STATUS.FEMALE]: '母',
}

// 性别Options
export const ORDER_STATUS_OPTIONS = createOptions(ORDER_STATUS, ORDER_STATUS_TEXT)

// 颜色枚举
export const COLOR_STATUS = {
	YELLOW: 'YELLOW',
	WHITE: 'WHITE',
	BLACK: 'BLACK',
} 

// 性别枚举显示文字
export const COLOR_STATUS_TEXT = {
	[COLOR_STATUS.YELLOW]: '黄色',
	[COLOR_STATUS.WHITE]: '白色',
	[COLOR_STATUS.BLACK]: '黑色',
}

// 性别Options
export const COLOR_STATUS_OPTIONS = createOptions(COLOR_STATUS, COLOR_STATUS_TEXT)

// 颜色枚举
export const CARE_STATUS = {
	NOR: 1,
	ADV: 2,
} 

// 性别枚举显示文字
export const CARE_STATUS_TEXT = {
	[CARE_STATUS.NOR]: '普通洗护',
	[CARE_STATUS.ADV]: '高级洗护',
}

// 性别Options
export const CARE_STATUS_OPTIONS = createOptions(CARE_STATUS, CARE_STATUS_TEXT)

