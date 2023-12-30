export class IngredientType {
    static IngredientType = [
        {'MEAT' : '肉'},
        {'SEAFOOD' : '魚介類'},
        {'EGG' : '卵'},
        {'DAIRY' : '乳製品'},
        {'VEGETABLE' : '野菜'},
        {'GRAIN' : '穀物'},
        {'OIL_FATS' : '油'},
        {'SEASONING' : '調味料'},
        {'PREPARED' : '既製品'},
        {'OTHER' : 'その他'}
    ]

    static getJaIngredientType = (typeEn : string)  => {
       return Object.values((this.IngredientType.find((typeObj)=>(Object.keys(typeObj)[0] === typeEn))) || 'OTHER')[0];
    }

    static getEnIngredientType = (typeJa : string) => {
        return Object.keys((this.IngredientType.find((typeObj)=>(Object.values(typeObj)[0] === typeJa))) || 'その他')[0];
    }
}