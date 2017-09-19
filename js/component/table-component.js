import * as Constant from '../common/constant.js';
import jqPaginator from 'jqpaginator/dist/jqpaginator.min';


export class TableComponent{

    constructor(biz){
        this.biz = biz;
    }

    render(data){
        return `
                    <ul class="row ">
						<li class="tabTitle">
							<ul class="col ">
								<li class="col1">序号</li>
								<li class="col2">机具大类</li>
								<li class="col3">机具小类</li>
								<li class="col4">机具品目</li>
								<li class="col5">生产企业</li>
								<li class="col6">产品名称</li>
								<li class="col7">机具型号</li>
								<li class="col8">分档名称</li>
								<li class="col9">车牌号码</li>
								<li class="col10">所在地</li>
							</ul>
						</li>
						${this._renderRows(data)}
					</ul>`;
    }

    _renderRows(data){
        let rows = ``;
        data.forEach((item,index)=>{
            rows += `<li class="tabTitle">
							<ul class="col ">
								<li class="col1">${index + (this.biz.pageIndex-1) * Constant.pageSize + 1}</li>
								<li class="col2">${item.typeA}</li>
								<li class="col3">${item.typeB}</li>
								<li class="col4">${item.category}</li>
								<li class="col5">${item.company}</li>
								<li class="col6">${item.type}</li>
								<li class="col7">${item.carType}</li>
								<li class="col8">${item.name}</li>
								<li class="col9">${item.carNo}</li>
								<li class="col10">${item.carCity}</li>
							</ul>
						</li>`;
        });

        return rows;
    }

    renderPageinator(){
        let self = this;
        if(this.biz.searchResult.length === 0){
            alert('没有数据');
            return ;
        }
        let totalPages = Math.ceil(this.biz.searchResult.length / Constant.pageSize);
        let currentPage = this.biz.pageIndex;
        $('#foot').jqPaginator({
            totalPages: totalPages,
            visiblePages: 10,
            currentPage:currentPage,
            onPageChange: function (num, type) {
                // 请求数据
                self.biz.searchDataByPage(self.biz.searchResult,{
                    pageIndex : num
                });
                let data = self.biz.searchResult.slice((num-1)*Constant.pageSize,num*Constant.pageSize);
                // 渲染表格
                $('.section').html('');
                $('.section').html(self.render(data));
            }

        });
    }
}