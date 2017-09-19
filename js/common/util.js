function  getArrayDistinct(arr ){
    if(!arr)
    {
        return [];
    }
    return arr.filter((value, index, self)=>{
        return self.indexOf(value) === index;
    });
}

function getArrayDistinctByAttribute(arr ,attribute ) {
    let values = [];
    arr.forEach((item)=>{
        if(values.indexOf(item[attribute]) === -1){
            values.push(item[attribute]);
        }
    });

    values = values.map((item)=>{
        let obj = {
            value : item,
            content : item
        };
        return obj
    });

    return values;
}

export {
    getArrayDistinct,
    getArrayDistinctByAttribute
}