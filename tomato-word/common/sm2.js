
/**
 * @params {number} oldFac 旧因素
 * @params {number} quality 审查的质量
 */

function calcFactor(oldFac, quality) {
    return oldFac + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
}

/**
 * @params {number} quality 代表审查质量的0~5之间的数字。0是最坏的，而5是最好的
 * @params {number} lastSchedule 最后一次评审空间的持续时间
 * @params {number} lastFactor 最后一个计划的因素
 */
export default function (quality, lastSchedule, lastFactor) {
    let newFac
    let curSchedule
    
    if(quality == null || quality < 0 || quality > 5) {
        quality = 0
    }
    
    if(lastSchedule === 1) {
        curSchedule = 6
        newFac = 2.5
    } else if(lastSchedule == null) {
        curSchedule = 1
        newFac = 2.5
    } else {
        if(quality < 3) {
            newFac = lastFactor
            curSchedule = lastSchedule
        } else {
            newFac = calcFactor(lastFactor, quality)
            
            if(newFac < 1.3) {
                newFac = 1.3
            }
            
            curSchedule = Math.round(lastSchedule * newFac)
        }
    }
    
    return {
        factor: newFac, //在下一轮计算中应该使用的因子
        schedule: curSchedule, //下一个审阅空间
        isRepeatAgain: quality < 4 //如果为true，则应再次检查该项目，直到质量不小于4
    }
}