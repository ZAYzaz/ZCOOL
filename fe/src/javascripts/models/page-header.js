
import URL from 'url'

const pageHeaderInfo = (url,prevUrl)=>{

    console.log('url路径',url,prevUrl);
    
    let _urlinfo = URL.parse(url)
    let _pathname = _urlinfo.pathname
    // search ?  是url种解析出来的 ?a=1&b=2&search
    
    let _search = URL.parse(prevUrl).search
    let _infos = {
        '/home': {
            title: '站酷(ZCOOL)',
            description: '-设计师互动平台-打开站酷，发现更好',
            list: []
        },
        '/map': {
            title: '地图显示',
            list: [
                { text: '地图', path: '#/map' }
            ]
        },
        '/position-list': {
            title: '职位管理',
            description: '职位列表',
            list: [
                { text: '职位列表' }
            ]
        },
        '/position-save': {
            title: '职位管理',
            description: '添加职位',
            list: [
                { text: '职位列表', path: '#/position-list'+_search },
                { text: '添加职位'}
            ]
        },
        '/position-update': {
            title: '职位管理',
            description: '职位更新',
            list: [
                { text: '职位列表', path: '#/position-list'+_search },
                { text: '职位更新'}
            ]
        }
    }
    return _infos[_pathname] || {  }
}

export default {
    pageHeaderInfo
}