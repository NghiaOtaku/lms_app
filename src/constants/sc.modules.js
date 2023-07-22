export const SC_MODULES = {
    ADMIN: 1,
};

const CATEGORY_FUNCS = {
    DASHBOARD: 1,
    PROGRAM: 2,
    CLASSROOM: 3,
    TEACHER: 4,
    STUDENT: 5,
    NEWS: 6,
    TRAINING: 7,
    SUPPORT_TICKET: 8,
    BLOG_POST: 9,
    PARENT_STUDENT: 10,
    FEEDBACK: 11,
    RESULT: 12,
};
/**
 * 1
 */
const DASHBOAD_FUNCS = {
    DASHBOAD_MAIN: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.DASHBOARD}.1`,
};

/**
 * 2
 */
const PROGRAM_FUNCS = {
    PROGRAM_MAIN: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.PROGRAM}.1`,
    PROGRAM_MATERIAL: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.PROGRAM}.2`,
};

/**
 * 3
 */
const CLASSROOM_FUNCS = {
    CLASSROOM_MAIN: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.CLASSROOM}.1`,
    MY_CLASSROOM: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.CLASSROOM}.2`,
    LESSON_DETAILS: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.CLASSROOM}.3`,
};

/**
 * 4
 */
const TEACHER_FUNCS = {
    TEACHER_MAIN: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.TEACHER}.1`,
    TEACHER_DELETE: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.TEACHER}.2`,
    TEACHER_BY_EXCEL: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.TEACHER}.3`,
    // TEACHER_POSITION: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.TEACHER}.4`,
    TEACHER_DEPARTMENT: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.TEACHER}.4`,
    TEACHER_SC_ROLE: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.TEACHER}.5`,
    TEACHER_SC_PRIVILEGE: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.TEACHER}.6`,
};

/**
 * 5
 */
const STUDENT_FUNCS = {
    STUDENT_MAIN: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.STUDENT}.1`,
    STUDENT_DELETE: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.STUDENT}.2`,
    STUDENT_SEARCH: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.STUDENT}.3`,
    STUDENT_BY_EXCEL: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.STUDENT}.4`,
};

/**
 * 6
 */
const NEWS_FUNCS = {
    NEWS_MAIN: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.NEWS}.1`,
    NEWS_CATEGORY: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.NEWS}.2`,
};

/**
 * 7
 */
const TRAINING_FUNCS = {
    TRAINING: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.TRAINING}.1`,
};

/**
 * 8
 */
const SUPPORT_TICKET_FUNCS = {
    SUPPORT_TICKET: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.SUPPORT_TICKET}.1`,
};

/**
 * 9
 */
const BLOG_POST_FUNCS = {
    BLOG_POST: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.BLOG_POST}.1`,
};

/**
 * 9
 */
const PARENT_STUDENT_FUNCS = {
    PARENT_STUDENT: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.BLOG_POST}.1`,
};
/**
 *
 */
const FEEDBACK_FUNCS = {
    FEEDBACK_MAIN: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.BLOG_POST}.1`,
};
const RESULT_FUNCS = {
    RESULT_MAIN: `${SC_MODULES.ADMIN}.${CATEGORY_FUNCS.BLOG_POST}.1`,
};
export const ADMIN_FUNCTIONS = {
    ...DASHBOAD_FUNCS,
    ...PROGRAM_FUNCS,
    ...CLASSROOM_FUNCS,
    ...TEACHER_FUNCS,
    ...STUDENT_FUNCS,
    ...NEWS_FUNCS,
    ...TRAINING_FUNCS,
    ...SUPPORT_TICKET_FUNCS,
    ...BLOG_POST_FUNCS,
    ...PARENT_STUDENT_FUNCS,
    ...FEEDBACK_FUNCS,
    ...RESULT_FUNCS,
    ADMIN: {
        // Thành phố
        CITY: `${SC_MODULES.ADMIN}.${1}`,
        // Quận huyện
        DISTRICT: `${SC_MODULES.ADMIN}.${2}`,
        // Phường xã
        WARD: `${SC_MODULES.ADMIN}.${3}`,
        // Tổ chức
        ORGANIZATION: `${SC_MODULES.ADMIN}.${4}`,
        // Loại tổ chức
        ORGANIZATION_CATEGORY: `${SC_MODULES.ADMIN}.${5}`,
        // Hình thức tổ chức
        ORGANIZATION_TYPE: `${SC_MODULES.ADMIN}.${6}`,
        // Qui mô tổ chức
        ORGANIZATION_SCALE: `${SC_MODULES.ADMIN}.${7}`,
        // Danh sách tài khoản
        ACCOUNT_LIST: `${SC_MODULES.ADMIN}.${8}`,
        // Vai trò người dùng
        ACCOUNT_ROLE: `${SC_MODULES.ADMIN}.${9}`,
        // Cấp quyền sử dụng
        ACCOUNT_PRIVILEGE: `${SC_MODULES.ADMIN}.${10}`,
        // Phân hệ
        ACCOUNT_MODULE: `${SC_MODULES.ADMIN}.${11}`,
        // Tính năng
        ACCOUNT_FUNCTION: `${SC_MODULES.ADMIN}.${12}`,
        // Sản phầm
        PRODUCT: `${SC_MODULES.ADMIN}.${13}`,
        // Danh mục sản phẩm
        PRODUCT_CATEGORY: `${SC_MODULES.ADMIN}.${14}`,
        // Nhà cung cấp sản phẩm (Thương hiệu)
        PRODUCT_SUPPLIER: `${SC_MODULES.ADMIN}.${15}`,
        // Đơn vị tính
        CALCULATION_UNIT: `${SC_MODULES.ADMIN}.${16}`,
        // Tạo đơn bán hàng
        CREATE_ORDER: `${SC_MODULES.ADMIN}.${17}`,
        // Danh sách đơn bán hàng
        ORDER_LIST: `${SC_MODULES.ADMIN}.${18}`,
        // Khuyến mãi
        PROMOTION: `${SC_MODULES.ADMIN}.${19}`,
        // Cửa hàng
        SHOP: `${SC_MODULES.ADMIN}.${20}`,
        // Phiếu thu chi
        FINANCE_TICKET: `${SC_MODULES.ADMIN}.${21}`,
        // Sổ thu chi
        FINANCE_BOOK: `${SC_MODULES.ADMIN}.${22}`,
        // Tài khoản kế toán
        ACCOUNTING_CATEGORY: `${SC_MODULES.ADMIN}.${23}`,
        // Tài khoản ngân hàng
        ACCOUNT_BANK: `${SC_MODULES.ADMIN}.${24}`,
        // Cấp bản quyền
        LICENCE_PRIVILEGE: `${SC_MODULES.ADMIN}.${25}`,
        // Danh sách bản quyền
        LICENCE_LIST: `${SC_MODULES.ADMIN}.${26}`,
        // Danh sách bản quyền sắp hết hạn
        LICENCE_EXPIRED: `${SC_MODULES.ADMIN}.${27}`,
        // Yêu cầu hỗ trợ
        SUPPORT_TICKET: `${SC_MODULES.ADMIN}.${28}`,
        // Thông báo
        BLOG_POST: `${SC_MODULES.ADMIN}.${29}`,
        // Loại thông báo
        BLOG_CATEGORY: `${SC_MODULES.ADMIN}.${30}`,
        // Danh mục sự kiện
        TRIP_EVENT: `${SC_MODULES.ADMIN}.${31}`,
        // Ưu đãi cùng scfamily
        REWARD: `${SC_MODULES.ADMIN}.${32}`,
        // Mẫu báo cáo
        REPORT_FORM: `${SC_MODULES.ADMIN}.${33}`,
        // Hợp đồng
        CONTRACT_VOICECLOUD: `${SC_MODULES.ADMIN}.${34}`,
    },
};
