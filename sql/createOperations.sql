CREATE TABLE Operations (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    containerID INT FOREIGN KEY REFERENCES Containers(ID),
    startDate DATETIME,
    endDate DATETIME,
    operationType NVARCHAR(100),
    operatorName NVARCHAR(100),
    inspectionLocation NVARCHAR(100)
);

INSERT INTO Operations (containerID, startDate, endDate, operationType, operatorName, inspectionLocation)
VALUES
(1, '2024-11-22 07:00:00', '2024-11-22 09:00:00', N'Перевозка', N'Пупкин Леонид Васильевич', N'Склад 1'),
(2, '2024-11-22 07:00:00', '2024-11-22 09:00:00', N'Погрузка', N'Крымов Сергей Сергеевич', N'Склад 2'),
(1, '2024-11-22 07:00:00', '2024-11-22 09:00:00', N'Разгрузка', N'Иванов Иван Иванович', N'Склад 3');