import * as MockData from '../mockdata/mockdata.js';
import {CarModel, PageParamModel, SearchParamModel, SearchResultModel} from "../model/car_model";
import * as Constant from '../common/constant.js';

export class CarBiz {

    private data: Array<CarModel>;// 数据源数据
    private searchResult: Array<CarModel>;// 查询缓存数据，加快分页查询速度
    private pageIndex: number;// 页数
    private pageSize: number;// 每页显示条数
    private searchParam : SearchParamModel;
    private pageParam : PageParamModel;

    constructor() {
        this.data = MockData.carList;// 获取数据源数据
        this.data = this._sortCarList(this.data);// 数据排序
        this.searchResult = [];// 缓存数据对象
        this.pageIndex = 1;// 默认页码
        this.pageSize = Constant.pageSize;// 每页显示条数
        this.searchParam = null;
        this.pageParam = null;
    }

    public setSearchParam(param : SearchParamModel){
        this.searchParam = param;
    }

    public setPageParam(param : PageParamModel){
        this.pageParam = param;
    }

    /**
     * @member 农机数据排序
     * @param {Array<CarModel>} data 数据源数据
     * @returns {Array<CarModel>} 排序结果
     * @private
     */
    private _sortCarList(data: Array<CarModel>): Array<CarModel> {
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
    public searchData(param: SearchParamModel): SearchResultModel {
        let arr = this._filterData(this.data, param);// 根据条件过滤数据
        this.searchResult = arr ;
        return this._initSearchResult(arr, 1, this.pageSize);// 包装数据结果
    }

    /**
     * @member 过滤数据
     * @param {Array<CarModel>} data 数据源数据
     * @param {SearchParamModel} param 过滤条件
     * @returns {Array<CarModel>} 查询结果
     * @private
     */
    private _filterData(data: Array<CarModel>, param: SearchParamModel): Array<CarModel> {
        data = data.filter((farmCar) => {
            let result = false;
            result = result && (farmCar.typeA === param.typeA) || false;// 比较大类
            result = result && (farmCar.typeB === param.typeB) || false;// 比较小类
            result = result && (farmCar.category === param.category) || false;// 比较品目
            result = result && (farmCar.carNo.indexOf(param.typeA) !== -1) || false;// 比较车牌号码
            result = result && (farmCar.carType === param.carType) || false;// 比较机具型号
            result = result && (farmCar.type === param.type) || false;// 比较器具类型
            result = result && (farmCar.name === param.name) || false;// 比较产品名称
            result = result && (farmCar.company.indexOf(param.company) !== -1) || false;// 比较企业
            result = result && (farmCar.carCity === param.carCity) || false;// 比较所在地
            return result;
        });
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
    private _initSearchResult(result: Array<CarModel>, pageIndex: number, pageSize: number): SearchResultModel {
        let start = (pageIndex - 1) * pageSize;
        let end = pageIndex * pageSize;
        let arr = result.splice(start, end);
        let totalCount = result.length;
        let pageCount = result.length / pageSize + 1;
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
    public searchDataByPage(data: Array<CarModel>, param: PageParamModel): SearchResultModel {
        return this._initSearchResult(data,param.pageIndex,param.pageSize);// 包装数据结果
    }


}