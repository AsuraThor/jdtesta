function getStyle(ele) {
    if(ele.currentStyle){
        return ele.currentStyle;
    }else{
        return getComputedStyle(ele,null);
    }
}