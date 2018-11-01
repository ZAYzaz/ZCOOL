
// 提供列表数据
// 接收页码信息，需要包含pageNo。pageSize
const list = (page) => {
    return $.ajax({
        url: '/api/v1/match/list',
        data: page,
        success:(results) => {
            
           return results
        }
    })
}

// 提供保存数据
const save = (data) => {
    return new Promise((resolve) => {
        $('.match-save #save-form').ajaxSubmit({
            url: '/api/v1/match/save',
            type: 'post',
            success: (results) => {
                resolve(results)
            }
        })
    })
}

// 提供删除数据
const remove = (data) => {
    return $.ajax({
        url: '/api/v1/match/remove',
        data,
        type: 'delete',
        success:(results) => {
           return results
        }
    })
}

// 提供某条数据
const listone = (data) => {
    return $.ajax({
        url: '/api/v1/match/listone',
        data,
        success:(results) => {
            
           return results
        }
    })
}


// 更新某条数据
const update = (data) => {
    return new Promise((resolve) => {
        $('.match-update #update-form').ajaxSubmit({
            url: '/api/v1/match/update',
            type: 'post',
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


