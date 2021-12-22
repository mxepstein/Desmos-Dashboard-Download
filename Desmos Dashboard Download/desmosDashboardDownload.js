(function() {
    "use strict";
    //The code below does almost all the work of the extension
    function startDownload() {
        let csv = [];
        let studentList = document.getElementsByClassName('student-grid-row');
        for (var i = 0; i < studentList.length; i++) {
            let studentRow = [];
            //Break apart first and last names
            let studentFullName = studentList[i].getElementsByClassName('grid-student-name')[0].innerText
            if (studentFullName.search(' ') == -1) {
                studentFullName = studentFullName + ','
            } else {
                studentFullName = studentFullName.replace(' ', ',');
            }
            studentRow.push(studentFullName);

            //Iterate through response cells
            let studentCellsRaw = studentList[i].getElementsByClassName('grid-cell');
            let numberCorrect = 0;
            let numberIncomplete = 0
            let kind = null;
            for (var j = 0; j < studentCellsRaw.length; j++) {
                kind = getKind(studentCellsRaw[j])
                if (kind == 'Correct')
                    numberCorrect++;
                else if (kind == 'Incomplete')
                    numberIncomplete++;
                studentRow.push(kind)
            }

            studentRow.unshift(numberIncomplete + ' Incomplete');
            studentRow.unshift(numberCorrect + ' Correct')

            csv.push(studentRow.join(','));
        }
        let downloadLink = document.createElement("a");
        let fileName = prompt("File name: ", "Desmos Dashboard");
        if (fileName == null) return;
        downloadLink.download = fileName != "" ? fileName + ".csv" : "DesmosDashboard.csv"
        downloadLink.href = window.URL.createObjectURL(new Blob([csv.join("\r\n")], {
            type: "text/csv"
        }));
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    function getKind(cell) {
        if (cell.getElementsByClassName('correct-decorator').length > 0) {
            return "Correct";
        } else if (cell.getElementsByClassName('incorrect-decorator').length > 0) {
            return "Incorrect";
        } else if (cell.getElementsByClassName('no-input-decorator').length > 0) {
            return "Read";
        } else if (cell.getElementsByClassName('work-submitted-decorator').length > 0) {
            return "Complete";
        } else if (cell.getElementsByClassName('warning-decorator').length > 0) {
            var elem = cell.getElementsByClassName('warning-decorator')[0]
            var elem2 = elem.getElementsByClassName('pillow-icon-error')[0]
            var toolt= elem2.attributes.getNamedItem("aria-label").value
            //var toolt = elem.attributes.getNamedItem("tooltip").value;
            return "Warning: " + toolt
        } else {
            return "Incomplete";
        }
    }


    startDownload();
})();
