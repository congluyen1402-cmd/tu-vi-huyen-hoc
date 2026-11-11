const fs = require('fs');

// We will test full integration on Case 1 (10/04/2002 19:30 Nam, Dương lịch)
// and compare with tuvivn_dom_extracted.json
const expected = JSON.parse(fs.readFileSync('scripts/tuvivn_dom_extracted.json', 'utf8'));

// Canonical tables
const THIEN_CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const TU_HOA_TABLE = [
  { 'Liêm Trinh': 'Hóa Lộc', 'Phá Quân': 'Hóa Quyền', 'Vũ Khúc': 'Hóa Khoa', 'Thái Dương': 'Hóa Kỵ' },
  { 'Thiên Cơ': 'Hóa Lộc', 'Thiên Lương': 'Hóa Quyền', 'Tử Vi': 'Hóa Khoa', 'Thái Âm': 'Hóa Kỵ' },
  { 'Thiên Đồng': 'Hóa Lộc', 'Thiên Cơ': 'Hóa Quyền', 'Văn Xương': 'Hóa Khoa', 'Liêm Trinh': 'Hóa Kỵ' },
  { 'Thái Âm': 'Hóa Lộc', 'Thiên Đồng': 'Hóa Quyền', 'Thiên Cơ': 'Hóa Khoa', 'Cự Môn': 'Hóa Kỵ' },
  { 'Tham Lang': 'Hóa Lộc', 'Thái Âm': 'Hóa Quyền', 'Hữu Bật': 'Hóa Khoa', 'Thiên Cơ': 'Hóa Kỵ' },
  { 'Vũ Khúc': 'Hóa Lộc', 'Tham Lang': 'Hóa Quyền', 'Thiên Lương': 'Hóa Khoa', 'Văn Khúc': 'Hóa Kỵ' },
  { 'Thái Dương': 'Hóa Lộc', 'Vũ Khúc': 'Hóa Quyền', 'Thái Âm': 'Hóa Khoa', 'Thiên Đồng': 'Hóa Kỵ' },
  { 'Cự Môn': 'Hóa Lộc', 'Thái Dương': 'Hóa Quyền', 'Văn Khúc': 'Hóa Khoa', 'Văn Xương': 'Hóa Kỵ' },
  { 'Thiên Lương': 'Hóa Lộc', 'Tử Vi': 'Hóa Quyền', 'Tả Phù': 'Hóa Khoa', 'Vũ Khúc': 'Hóa Kỵ' },
  { 'Phá Quân': 'Hóa Lộc', 'Cự Môn': 'Hóa Quyền', 'Thái Âm': 'Hóa Khoa', 'Tham Lang': 'Hóa Kỵ' }
];

console.log('Test setup ready.');
