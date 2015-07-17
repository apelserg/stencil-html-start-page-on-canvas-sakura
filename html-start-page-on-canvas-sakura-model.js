// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Ссылка
//===
APELSERG.MODEL.Link = function (linkUrl, linkName, linkX, linkY, lengthX, lengthY, linkColor) {
    this.Url = linkUrl;
    this.Name = linkName;
    this.X = linkX;
    this.Y = linkY;
    this.LengthX = lengthX;
    this.LengthY = lengthY;
    this.Color = linkColor;
    this.SelectColor = 'orange';
    this.SelectCnt = 0;
    this.SelectName = false;
    this.ShowBorder = false;
    this.FontHeight = 20;
}

//===
// Массив ссылок
//===
APELSERG.MODEL.MakeLinks = function () {

    var baseX = APELSERG.CONFIG.SET.BaseLinkX;
    var baseY = APELSERG.CONFIG.SET.BaseLinkY + 50;

    var links = [];

    var linksList = [
        { name: "GitHub - Шаблонетка Start page Sakura", url: "https://github.com/apelserg/stencil-html-start-page-on-canvas-sakura" },
    ];

    for (var n = 0 in linksList) {

        var color = "blue";
        var link = new APELSERG.MODEL.Link(linksList[n].url, linksList[n].name, baseX, baseY + 30 * n, linksList[n].name.length * 10 + 30, 30, color);

        links.push(link);
    }
    return links;
}



//===
// Лепесток
//===
APELSERG.MODEL.Flake = function (flakeX, flakeY, flakeSize, shiftDir, flakeColor) {
    this.BaseX = flakeX;    
    this.X = flakeX;
    this.Y = flakeY;
    this.Size = flakeSize;
    this.ShiftDir = shiftDir;
    this.DeltaX = 2;
    this.DeltaY = 2;
    this.DeltaR = 1;
    this.DeltaR2 = 1;
    this.DeltaR3 = 1;
    this.DeltaR4 = 1;
    this.DeltaR5 = 1;
    this.DeltaR6 = 1;
    this.CntFlip = 0;
    this.Color = flakeColor;
}

//===
// Массив лепестков
//===
APELSERG.MODEL.MakeSakura = function (flakeNum) {

    var Sakura = [];
    var color = "white";

    for (var n = 0; n < flakeNum; n++) {

        var shiftDir = 1;
        if (Math.round(Math.random() * 100) % 2 == 0) shiftDir = -1;

        var flipDir = 1;
        if (Math.round(Math.random() * 100) % 2 == 0) {
            flipDir = -1;
            color = "#FFC0FF";
        }
        else {
            color = "#FFF0FF"; //"#FFE0FF";
        }

        var x = Math.round(Math.random() * APELSERG.CONFIG.SET.PicWidth);
        var y = Math.round(Math.random() * APELSERG.CONFIG.SET.PicHeight);

        var flake = new APELSERG.MODEL.Flake(x, y, APELSERG.CONFIG.SET.SakuraSize, shiftDir, color);

        Sakura.push(flake);
    }
    return Sakura;
}

//===
// Проверка клика на кнопке
//===
APELSERG.MODEL.CheckClickFrame = function (frame) {

    if ((APELSERG.CONFIG.PROC.MouseClickX > frame.X)
        && (APELSERG.CONFIG.PROC.MouseClickX < frame.X + frame.LengthX)
        && (APELSERG.CONFIG.PROC.MouseClickY > frame.Y)
        && (APELSERG.CONFIG.PROC.MouseClickY < frame.Y + frame.LengthY)){

        return true;
    }
    return false;
}

//===
// Проверка мыши над кнопкой
//===
APELSERG.MODEL.CheckMoveFrame = function (frame) {

    if ((APELSERG.CONFIG.PROC.MouseMoveX > frame.X)
        && (APELSERG.CONFIG.PROC.MouseMoveX < frame.X + frame.LengthX)
        && (APELSERG.CONFIG.PROC.MouseMoveY > frame.Y)
        && (APELSERG.CONFIG.PROC.MouseMoveY < frame.Y + frame.LengthY)) {

        return true;
    }
    return false;
}

//===
// Нажатие кнопок
//===
APELSERG.MODEL.UpdateButtons = function () {

    for (var n = 0 in APELSERG.MODEL.DATA.Links) {

        var link = APELSERG.MODEL.DATA.Links[n];

        link.SelectName = APELSERG.MODEL.CheckMoveFrame(link);
        if (link.SelectCnt > 0) link.SelectCnt--;

        if (APELSERG.MODEL.CheckClickFrame(link)) {

            link.SelectCnt = APELSERG.CONFIG.SET.CntSelect;

            window.open(link.Url, "_blank");
        }
    }

    APELSERG.CONFIG.PROC.MouseClickX = -999;
    APELSERG.CONFIG.PROC.MouseClickY = -999;

    //APELSERG.CONFIG.PROC.MouseMoveX = -999;
    //APELSERG.CONFIG.PROC.MouseMoveY = -999;

}
//===
// Переместить лепестки
//===
APELSERG.MODEL.UpdateSakura = function () {

    for (var n = 0 in APELSERG.MODEL.DATA.Sakura) {

        var flake = APELSERG.MODEL.DATA.Sakura[n];

        var dir = 1;
        if (Math.round(Math.random() * 100) % 2 == 0) dir = -1;

        if (Math.abs(flake.BaseX - flake.X) > 200) {
            flake.ShiftDir *= -1;
        }
        flake.X += flake.ShiftDir * Math.round(Math.random() * 100) % 4;
        
        flake.Y += Math.round(Math.random() * 100) % 2;
        if (flake.Y > APELSERG.CONFIG.SET.PicHeight) flake.Y = 1;

        ///*
        flake.CntFlip--;
        if (flake.CntFlip <= 0) {

            flake.CntFlip = Math.round(Math.random() * 55);

            flake.DeltaX = Math.round(Math.random() * 10) % 2;
            flake.DeltaY = Math.round(Math.random() * 10) % 3;
            flake.DeltaR = Math.round(Math.random() * 10) % 4;
            //if (flake.DeltaR < 2) flake.DeltaR = 2;

            flake.DeltaR2 = Math.round(Math.random() * 10) % 3;
            flake.DeltaR3 = Math.round(Math.random() * 10) % 3;
            flake.DeltaR4 = Math.round(Math.random() * 10) % 3;
            flake.DeltaR5 = Math.round(Math.random() * 10) % 3;
            flake.DeltaR6 = Math.round(Math.random() * 10) % 3;

        }
    }
}
