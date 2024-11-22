SELECT
    '[' + STRING_AGG(
        '{' +
            '"id": ' + CAST(id AS NVARCHAR(100)) + ', ' +
            '"containerID": ' + CAST(containerID AS NVARCHAR(100)) + ', ' +
            '"startDate": "' + FORMAT(startDate, 'yyyy-MM-dd HH:mm:ss') + '", ' +
            '"endDate": "' + FORMAT(endDate, 'yyyy-MM-dd HH:mm:ss') + '", ' +
            '"operationType": "' + operationType + '", ' +
            '"operatorName": "' + operatorName + '", ' +
            '"inspectionLocation": "' + inspectionLocation + '"' +
        '}'
    , ', ') + ']'
FROM
    Operations;