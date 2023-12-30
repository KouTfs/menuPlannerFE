export class TypeConstManager {
    static MenuType = [
        {'STAPLE' : '主食'},
        {'MAIN' : '主菜'},
        {'SUB' : '副菜'},
        {'OTHER' : 'その他'}
    ]

    static getJaMenuType = (type : string) =>{
        return Object.values((this.MenuType.find((typeObj)=>(Object.keys(typeObj)[0] === type))) || 'OTHER');
    }
}