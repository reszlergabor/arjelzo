if (app.books.length == 0) {
    alert("Nincs megnyitott könyv.");
} else {
    var book = app.activeBook;
    var targetDoc = app.activeDocument; // A jelenleg aktív dokumentum a cél dokumentum

    // Végigmegyünk a könyv dokumentumain
    for (var i = 0; i < book.bookContents.length; i++) {
        var bookContent = book.bookContents[i];
        var doc = app.open(File(bookContent.fullName));

        // Végigmegyünk a dokumentum oldalain
        for (var j = 0; j < doc.pages.length; j++) {
            var page = doc.pages[j];
            
            // Végigmegyünk az oldal csoportjain
            for (var k = 0; k < page.groups.length; k++) {
                var group = page.groups[k];
                
                // Létrehozunk egy új oldalt a cél dokumentumban
                var newPage = targetDoc.pages.add();
                
                // Másoljuk a csoportot
                var copiedGroup = group.duplicate(newPage);
                
                // Igazítjuk a csoportot a bal felső sarokba
                copiedGroup.move([0, 0]);
            }
        }
        
        // Bezárjuk a dokumentumot anélkül, hogy mentenénk
        doc.close(SaveOptions.NO);
    }
    
    alert("A csoportok átmásolása sikeresen befejeződött.");
}