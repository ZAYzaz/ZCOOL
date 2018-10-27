
const list = () => {
    return $.ajax({
        url: '/api/v1/position/list',
        success:(results) => {
            
           return results
        }
    })
}

const save = (data) => {
    //未引入jQuery.form.js插件之前的写法
    // return $.ajax({
    //     url: '/api/v1/position/save',
    //     type: 'post',
    //     data,
    //     // headers: {
    //     //     'content-type': 'application/x-'
    //     // },
    //     success:(results) => {
            
    //        return results
    //     }
    // })

    return new Promise((resolve) => {
        $('.position-save #save-form').ajaxSubmit({
            url: '/api/v1/position/save',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}

// 提供删除数据
const remove = (data) => {
    return $.ajax({
        url: '/api/v1/position/remove',
        data,
        success:(results) => {
            
           return results
        }
    })
}
// 提供某条数据
const listone = (data) => {
    return $.ajax({
        url: '/api/v1/position/listone',
        data,
        success:(results) => {
            
           return results
        }
    })
}

// 更新数据
const update = (data) => {
    return $.ajax({
        url: '/api/v1/position/update',
        type:'post',
        data,

        success:(results) => {
            
           return results
        }
    })
}

export default {
    list,
    save,
    remove,
    listone,
    update
}

