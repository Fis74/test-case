SELECT
    '[' + STRING_AGG(
        '{' +
            '"id": ' + CAST(id AS NVARCHAR(100)) + ', ' +
            '"number": ' + CAST(number AS NVARCHAR(100)) + ', ' +
            '"type": "' + type + '", ' +
            '"length": ' + CAST(length AS NVARCHAR(100)) + ', ' +
            '"width": ' + CAST(width AS NVARCHAR(100)) + ', ' +
            '"height": ' + CAST(height AS NVARCHAR(100)) + ', ' +
            '"weight": ' + CAST(weight AS NVARCHAR(100)) + ', ' +
            '"IsEmpty": ' + CAST(IsEmpty AS NVARCHAR(1)) + ', ' +
            '"arrivalDate": "' + FORMAT(arrivalDate, 'yyyy-MM-dd HH:mm:ss') + '"' +
        '}'
    , ', ') + ']'
FROM
    Containers;