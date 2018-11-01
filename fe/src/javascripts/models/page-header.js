
import URL from 'url'

const pageHeaderInfo = (url,prevUrl)=>{

   
    
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
        },
        '/activity/activity-list': {
            title: '活动管理',
            description: '活动列表',
            list: [
                { text: '活动列表' }
            ]
        },
        '/activity/activity-save': {
            title: '活动管理',
            description: '添加活动',
            list: [
                { text: '活动列表', path: '#/activity/activity-list'+_search },
                { text: '添加活动'}
            ]
        },
        '/activity/activity-update': {
            title: '活动管理',
            description: '活动更新',
            list: [
                { text: '活动列表', path: '#/activity/activity-list'+_search },
                { text: '活动更新'}
            ]
        },
        '/match-list': {
            title: '赛事管理',
            description: '赛事列表',
            list: [
                { text: '赛事列表' }
            ]
        },
        '/match-save': {
            title: '赛事管理',
            description: '添加赛事',
            list: [
                { text: '职位赛事', path: '#/match-list'+_search },
                { text: '添加赛事'}
            ]
        },
        '/match-update': {
            title: '赛事管理',
            description: '赛事更新',
            list: [
                { text: '赛事列表', path: '#/match-list'+_search },
                { text: '赛事更新'}
            ]
        }
    }
    return _infos[_pathname] || {  }
}

export default {
    pageHeaderInfo
}