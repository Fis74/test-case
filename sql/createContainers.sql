CREATE TABLE Containers (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    number INT,
    type NVARCHAR(100),
    length INT,
    width INT,
    height INT,
    weight INT,
    IsEmpty BIT,
    arrivalDate DATETIME
);

INSERT INTO Containers (number, type, length, width, height, weight, IsEmpty, arrivalDate)
VALUES
(123, N'Большой', 10000, 1000, 10, 10000, 1, '2024-11-22 07:00:00'),
(124, N'Средний', 6000, 600, 6, 6000, 1, '2024-11-22 07:00:00'),
(125, N'Маленький', 3000, 300, 3, 3000, 1, '2024-11-22 07:00:00');
