import {FormComponent} from "./component/form-component";
import {CarBiz} from "./biz/car-biz";
import {TableComponent} from "./component/table-component";

const biz = new CarBiz();
const formComponent = new FormComponent(biz);
const tableComponent = new TableComponent(biz);

function renderForm() {
    formComponent.initData();
    return formComponent.render();
}

function renderTable() {
    return tableComponent.render();
}

function bindEvent() {
    
}

$('.selectbox').html(renderForm());
formComponent.bindEvent(()=>{
    tableComponent.renderPageinator();
});
// $('.section').html(renderTable());
tableComponent.renderPageinator();
// bindEvent();