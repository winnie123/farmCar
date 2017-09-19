import * as MockData from '../mockData/mockdata.js';
import * as Util from '../common/util.js';

export class FormComponent {

    constructor(biz) {
        this.biz = biz;
        // this.param = null;
        this.baseData = null;
        this.itemData = null;
        this.actionData = null;
    }

    initData() {
        this.baseData = this._initBaseData();
        this.itemData = this._initItemData();
        this.actionData = this._initActionData();
    }

    _initBaseData() {
        let typeAs = this._initTypeAs();
        let typeBs = this._initTypesBs();
        let categorys = this._initCategory();
        let types = this._initTypes();
        let carTypes = this._initCarTypes();
        let names = this._initNames();
        let carCitys = this._initCarCitys();

        let baseData = {
            typeAs,
            typeBs,
            categorys,
            company: '',
            types,
            carTypes,
            names,
            carNo: '',
            carCitys
        };
        return baseData;
    }

    _initTypeAs() {
        let arr = [];
        arr = Util.getArrayDistinctByAttribute(MockData.carList, 'typeA');
        arr.splice(0, 0, {
            value: '',
            content: '请选择机具大类'
        });
        return arr;
    }

    _initTypesBs() {
        let arr = [];
        arr = Util.getArrayDistinctByAttribute(MockData.carList, 'typeB');
        arr.splice(0, 0, {
            value: '',
            content: '请选择机具小类'
        });
        return arr;
    }

    _initCategory() {
        let arr = [];
        arr = Util.getArrayDistinctByAttribute(MockData.carList, 'category');
        arr.splice(0, 0, {
            value: '',
            content: '请选择机具品目'
        });
        return arr;
    }

    _initTypes() {
        let arr = [];
        arr = Util.getArrayDistinctByAttribute(MockData.carList, 'type');
        arr.splice(0, 0, {
            value: '',
            content: '请选择产品名称'
        });
        return arr;
    }

    _initCarTypes() {
        let arr = [];
        arr = Util.getArrayDistinctByAttribute(MockData.carList, 'carType');
        arr.splice(0, 0, {
            value: '',
            content: '请选择机具型号'
        });
        return arr;
    }

    _initNames() {
        let arr = [];
        arr = Util.getArrayDistinctByAttribute(MockData.carList, 'name');
        arr.splice(0, 0, {
            value: '',
            content: '请选择分档名称'
        });
        return arr;
    }

    _initCarCitys() {
        let arr = [];
        arr = Util.getArrayDistinctByAttribute(MockData.carList, 'carCity');
        arr.splice(0, 0, {
            value: '',
            content: '请选择所在地'
        });
        return arr;
    }

    _initItemData() {
        let itemData = {
            result: []
        };
        return itemData;
    }

    _initActionData() {
        let actionData = {
            search: this.biz.search
        };
        return actionData;
    }

    render() {
        return `
            <form action="#">
                <div class="list1">
                    <select class="select1" id="typeAs_select">
                        ${this._renderOptions(this.baseData.typeAs)}
                    </select>
                    <select class="select2" id="types_select">
                        ${this._renderOptions(this.baseData.types)}
                    </select>
                </div>
                <div class="list2">
                    <select class="select1" id="typeBs_select">
                        ${this._renderOptions(this.baseData.typeBs)}
                    </select>
                    <select class="select2" id="carTypes_select">
                        ${this._renderOptions(this.baseData.carTypes)}
                    </select>
                </div>
                <div class="list3">
                    <select class="select1" id="categorys_select">
                        ${this._renderOptions(this.baseData.categorys)}
                    </select>
                    <select class="select2" id="names_select">
                        ${this._renderOptions(this.baseData.names)}
                    </select>
                </div>
                <div class="list4">
                    <div class="firm">
                        <input type="text" placeholder="车牌号码" id="carNo_txt"/>
                    </div>
                    <div class="busNumber">
                        <input type="text" placeholder="生产企业" id="company_txt"/>
                        <select id="carCitys_select">
                            ${this._renderOptions(this.baseData.carCitys)}
                        </select>
                    </div>
                </div>
                <div class="list5">
                    <input type="button" id="search_btn" v-on:click="searchData"/>
                </div>
            </div>`;
    }

    _renderOptions(arr) {
        let component = ``;
        arr.forEach((item) => {
            component += `<option value="${item.value}">${item.content}</option>`
        });
        return component;
    }

    bindEvent(callback) {
        let self = this;
        $('#search_btn').bind('click', () => {
            let param = {
                typeA: $('#typeAs_select').val(),// 比较大类
                typeB: $('#typeBs_select').val(),// 比较小类
                category: $('#categorys_select').val(),// 比较品目
                carNo: $('#carNo_txt').val(),// 比较车牌号码
                carType: $('#carTypes_select').val(),// 比较机具型号
                type: $('#types_select').val(),// 比较器具类型
                name: $('#names_select').val(),// 比较产品名称
                company: $('#company_txt').val(),// 比较企业
                carCity: $('#carCitys_select').val()// 比较所在地
            };
            this.biz.searchData(param);
            callback && typeof callback && callback();
        });
    }
}