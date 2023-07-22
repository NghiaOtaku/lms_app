/**
 * Giới hạn của date time
 */
export const DATE_LIMIT_TYPE = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
};

export const MOMENT_ADD_TYPE = {
    [`${DATE_LIMIT_TYPE.DAY}`]: 'days',
    [`${DATE_LIMIT_TYPE.WEEK}`]: 'weeks',
    [`${DATE_LIMIT_TYPE.MONTH}`]: 'months',
    [`${DATE_LIMIT_TYPE.QUARTER}`]: 'quarters',
    [`${DATE_LIMIT_TYPE.YEAR}`]: 'years',
};

export const DATE_RESULT_TYPE = {
    INT: 1,
    DATETIME: 2,
};
