import * as MockData from '../mockdata/mockdata.js';
import * as Constant from '../common/constant.js';

export class CarBiz {

    constructor() {
        this.data = MockData.carList;// 获取数据源数据
        this.data = this._sortCarList(this.data);// 数据排序
        this.searchResult = this.data;// 缓存数据对象
        this.pageIndex = 1;// 默认页码
        this.pageSize = Constant.pageSize;// 每页显示条数
    }

    _initDefaultSearchResult(data) {
        let arr = [];
        data.forEach((item, index) => {
            if (index < Constant.pageSize) {
                arr.push(item);
            }
        });
        return arr;
    }


    /**
     * @member 农机数据排序
     * @param {Array<CarModel>} data 数据源数据
     * @returns {Array<CarModel>} 排序结果
     * @private
     */
    _sortCarList(data) {
        if (data) {
            data = data.sort((a, b) => {
                return a.id < b.id ? 1 : -1;// 按照id顺序
            });
        }
        return data;
    }

    /**
     * @member 查询数据
     * @param {SearchParamModel} param 查询参数
     * @returns {SearchResultModel} 查询结果
     */
    searchData(param) {
        let arr = this._filterData(this.data, param);// 根据条件过滤数据
        this.searchResult = arr;
        return this._initSearchResult(arr, 1, this.pageSize);// 包装数据结果
    }

    /**
     * @member 过滤数据
     * @param {Array<CarModel>} data 数据源数据
     * @param {SearchParamModel} param 过滤条件
     * @returns {Array<CarModel>} 查询结果
     * @private
     */
    _filterData(data, param) {
        data = data.filter((farmCar) => {
            let result = true;
            result = (!param.typeA ? true : (farmCar.typeA === param.typeA || false)) && result;// 比较大类
            result = (!param.typeB ? true : (farmCar.typeB === param.typeB || false)) && result;// 比较小类
            result = (!param.category ? true : (farmCar.category === param.category || false)) && result;// 比较品目
            result = (!param.carNo ? true : (farmCar.carNo.indexOf(param.carNo) !== -1 || false)) && result;// 比较车牌号码
            result = (!param.carType ? true : (farmCar.carType === param.carType || false)) && result;// 比较机具型号
            result = (!param.type ? true : (farmCar.type === param.type || false)) && result;// 比较器具类型
            result = (!param.name ? true : (farmCar.name === param.name || false)) && result;// 比较产品名称
            result = (!param.company ? true : (farmCar.company.indexOf(param.company) !== -1 || false)) && result;// 比较企业
            result = (!param.carCity ? true : (farmCar.carCity === param.carCity || false)) && result;// 比较所在地
            return result;
        });
        this.searchResult = data;
        this.pageIndex = 1;
        return data;
    }

    /**
     * @member 包装查询结果
     * @param {Array<CarModel>} result 查询数据结果
     * @param {number} pageIndex 页码
     * @param {number} pageSize 页面显示条数
     * @returns {SearchResultModel} 查询结果对象
     * @private
     */
    _initSearchResult(result, pageIndex, pageSize) {
        let start = (pageIndex - 1) * pageSize;
        let end = pageIndex * pageSize;
        let arr = result.slice(start, end);
        let totalCount = result.length;
        let pageCount = result.length % pageSize ;
        return {
            carList: arr,
            totalCount,
            pageIndex,
            pageCount
        };
    }

    /**
     * @member 分页查询
     * @param {Array<CarModel>} data 缓存数据结果
     * @param {PageParamModel} param 查询条件
     * @returns {SearchResultModel} 查询结果
     */
    searchDataByPage(data, param) {
        this.pageIndex = param.pageIndex;
        let result = this._initSearchResult(data, param.pageIndex, Constant.pageSize);// 包装数据结果
        return result;
    }


}