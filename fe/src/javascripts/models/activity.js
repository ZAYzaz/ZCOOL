
const list = (page) => {
    return $.ajax({
        url: '/api/v1/activity/list',
        data:page,
        success:(results) => {
            
           return results
        }
    })
}

const save = (data) => {
    //未引入jQuery.form.js插件之前的写法
    // return $.ajax({
    //     url: '/api/v1/activity/save',
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
        $('.activity-save #save-form').ajaxSubmit({
            url: '/api/v1/activity/save',
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
        url: '/api/v1/activity/remove',
        data,
        type:'delete',
        success:(results) => {
            
           return results
        }
    })
}
// 提供某条数据
const listone = (data) => {
    return $.ajax({
        url: '/api/v1/activity/listone',
        data,
        success:(results) => {
            
           return results
        }
    })
}

// 更新数据
const update = () => {
    // return $.ajax({
    //     url: '/api/v1/activity/update',
    //     type:'post',

    //     success:(results) => {
            
    //        return results
    //     }
    // })

    return new Promise((resolve) => {
        $('.activity-update #update-form').ajaxSubmit({
            url: '/api/v1/activity/update',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}

export default {
    list,
    save,
    remove,
    listone,
    update
}

