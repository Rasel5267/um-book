"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterFilterableFields = exports.academicSemesterSearchableFields = exports.AcademicSemesterTitleCodeMapper = exports.AcademicSemesterCodes = exports.AcademicSemesterTitles = exports.AcademicSemesterMonths = void 0;
exports.AcademicSemesterMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
exports.AcademicSemesterTitles = [
    'Autumn',
    'Summer',
    'Fall',
];
exports.AcademicSemesterCodes = [
    '01',
    '02',
    '03',
];
exports.AcademicSemesterTitleCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};
exports.academicSemesterSearchableFields = ['title', 'code', 'year'];
exports.academicSemesterFilterableFields = [
    'searchTerm',
    'title',
    'code',
    'year',
];
