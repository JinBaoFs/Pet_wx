export function createOptions(enumObj, textMap) {
  return Object.keys(enumObj).map(key => ({
    label: textMap[enumObj[key]],
    value: enumObj[key]
  }))
}

export function updateReactive(target, source) {
  if (!source || typeof source !== 'object') return
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      target[key] = source[key]
    }
  }
}

//============================

/* 订单状态枚举 */
export const ORDER_STATUS = {
  PENDING: 0, // 待支付
  PAID: 1,    // 已支付
  SHIPPED: 2, // 已发货
  FINISHED: 3,// 已完成
  CANCELED: 4 // 已取消
}

export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.PENDING]: '待支付',
  [ORDER_STATUS.PAID]: '已支付',
  [ORDER_STATUS.SHIPPED]: '已发货',
  [ORDER_STATUS.FINISHED]: '已完成',
  [ORDER_STATUS.CANCELED]: '已取消'
}

export const ORDER_STATUS_OPTIONS = createOptions(ORDER_STATUS, ORDER_STATUS_TEXT)


//============================

/* 性别枚举 */
export const GENDER_STATUS = {
	MALE: 1,
	FMALE: 2
} 
export const GENDER_STATUS_TEXT = {
	[GENDER_STATUS.MALE]: '公',
	[GENDER_STATUS.FMALE]: '母',
}
export const GENDER_STATUS_OPTIONS = createOptions(GENDER_STATUS, GENDER_STATUS_TEXT)

//============================

/* 颜色枚举 */
export const COLOR_STATUS = {
	YELLOW: 'YELLOW',
	WHITE: 'WHITE',
	BLACK: 'BLACK',
} 
export const COLOR_STATUS_TEXT = {
	[COLOR_STATUS.YELLOW]: '黄色',
	[COLOR_STATUS.WHITE]: '白色',
	[COLOR_STATUS.BLACK]: '黑色',
}
export const COLOR_STATUS_OPTIONS = createOptions(COLOR_STATUS, COLOR_STATUS_TEXT)

//============================

/* 洗护类型 */
export const CARE_STATUS = {
	NOR: 1,
	ADV: 2,
} 
export const CARE_STATUS_TEXT = {
	[CARE_STATUS.NOR]: '普通洗护',
	[CARE_STATUS.ADV]: '高级洗护',
}
export const CARE_STATUS_OPTIONS = createOptions(CARE_STATUS, CARE_STATUS_TEXT)

//============================

/* 宠物狗狗类型 */
export const PET_DOG_TYPE = {
	MYQ: 1,
	HSQ: 2,
	TD:3
} 
export const PET_DOG_TYPE_TEXT = {
	[PET_DOG_TYPE.MYQ]: '牧羊犬',
	[PET_DOG_TYPE.HSQ]: '哈士奇',
	[PET_DOG_TYPE.TD]: '泰迪',
}
export const PET_DOG_TYPE_OPTIONS = createOptions(PET_DOG_TYPE, PET_DOG_TYPE_TEXT)

//============================

/* 宠物猫猫类型 */
export const PET_CAT_TYPE = {
	JJC: 1,
	YJC: 2,
	BO: 3,
	XL: 4,
	
} 
export const PET_CAT_TYPE_TEXT = {
	[PET_CAT_TYPE.JJC]: '金渐层',
	[PET_CAT_TYPE.YJC]: '银渐层',
	[PET_CAT_TYPE.BO]: '布偶',
	[PET_CAT_TYPE.XL]: '星罗',
}
export const PET_CAT_TYPE_OPTIONS = createOptions(PET_CAT_TYPE, PET_CAT_TYPE_TEXT)

//============================

/* 宠物年龄枚举 */
export const PET_AGE = {
	TMONTH: 1,
	BYEAR: 2,
	ONEYEAR: 3,
	TOWYEAR: 4,
	THEREYEAR: 5
} 
export const PET_AGE_TEXT = {
	[PET_AGE.TMONTH]: '三个月',
	[PET_AGE.BYEAR]: '半年',
	[PET_AGE.ONEYEAR]: '一年',
	[PET_AGE.TOWYEAR]: '两年',
	[PET_AGE.TOWYEAR]: '三年及以上',
}
export const PET_AGE_OPTIONS = createOptions(PET_AGE, PET_AGE_TEXT)

