"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockData = require("../mockdata/mockdata.js");
var Constant = require("../common/constant.js");
var CarBiz = (function () {
    function CarBiz() {
        this.data = MockData.carList; // 获取数据源数据
        this.data = this._sortCarList(this.data); // 数据排序
        this.searchResult = []; // 缓存数据对象
        this.pageIndex = 1; // 默认页码
        this.pageSize = Constant.pageSize; // 每页显示条数
        this.searchParam = null;
        this.pageParam = null;
    }
    CarBiz.prototype.setSearchParam = function (param) {
        this.searchParam = param;
    };
    CarBiz.prototype.setPageParam = function (param) {
        this.pageParam = param;
    };
    /**
     * @member 农机数据排序
     * @param {Array<CarModel>} data 数据源数据
     * @returns {Array<CarModel>} 排序结果
     * @private
     */
    CarBiz.prototype._sortCarList = function (data) {
        if (data) {
            data = data.sort(function (a, b) {
                return a.id < b.id ? 1 : -1; // 按照id顺序
            });
        }
        return data;
    };
    /**
     * @member 查询数据
     * @param {SearchParamModel} param 查询参数
     * @returns {SearchResultModel} 查询结果
     */
    CarBiz.prototype.searchData = function (param) {
        var arr = this._filterData(this.data, param); // 根据条件过滤数据
        this.searchResult = arr;
        return this._initSearchResult(arr, 1, this.pageSize); // 包装数据结果
    };
    /**
     * @member 过滤数据
     * @param {Array<CarModel>} data 数据源数据
     * @param {SearchParamModel} param 过滤条件
     * @returns {Array<CarModel>} 查询结果
     * @private
     */
    CarBiz.prototype._filterData = function (data, param) {
        data = data.filter(function (farmCar) {
            var result = false;
            result = result && (farmCar.typeA === param.typeA) || false; // 比较大类
            result = result && (farmCar.typeB === param.typeB) || false; // 比较小类
            result = result && (farmCar.category === param.category) || false; // 比较品目
            result = result && (farmCar.carNo.indexOf(param.typeA) !== -1) || false; // 比较车牌号码
            result = result && (farmCar.carType === param.carType) || false; // 比较机具型号
            result = result && (farmCar.type === param.type) || false; // 比较器具类型
            result = result && (farmCar.name === param.name) || false; // 比较产品名称
            result = result && (farmCar.company.indexOf(param.company) !== -1) || false; // 比较企业
            result = result && (farmCar.carCity === param.carCity) || false; // 比较所在地
            return result;
        });
        return data;
    };
    /**
     * @member 包装查询结果
     * @param {Array<CarModel>} result 查询数据结果
     * @param {number} pageIndex 页码
     * @param {number} pageSize 页面显示条数
     * @returns {SearchResultModel} 查询结果对象
     * @private
     */
    CarBiz.prototype._initSearchResult = function (result, pageIndex, pageSize) {
        var start = (pageIndex - 1) * pageSize;
        var end = pageIndex * pageSize;
        var arr = result.splice(start, end);
        var totalCount = result.length;
        var pageCount = result.length / pageSize + 1;
        return {
            carList: arr,
            totalCount: totalCount,
            pageIndex: pageIndex,
            pageCount: pageCount
        };
    };
    /**
     * @member 分页查询
     * @param {Array<CarModel>} data 缓存数据结果
     * @param {PageParamModel} param 查询条件
     * @returns {SearchResultModel} 查询结果
     */
    CarBiz.prototype.searchDataByPage = function (data, param) {
        return this._initSearchResult(data, param.pageIndex, param.pageSize); // 包装数据结果
    };
    return CarBiz;
}());
exports.CarBiz = CarBiz;
