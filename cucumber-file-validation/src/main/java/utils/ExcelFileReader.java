package utils;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ExcelFileReader {

    private final File testFile;

    public ExcelFileReader(String fileName) throws FileNotFoundException {
        String filePath = String.format("src/main/resources/%s", fileName);
        this.testFile = new File(filePath);
    }

    public boolean isFileExists() {
        return testFile.exists() && testFile.isFile();
    }

    public List<String> getFileHeaders() {
        List<String> headerData = new ArrayList<>();
        HSSFRow row = getWorkSheet(0).getRow(0);
        for (Cell cell : row) {
            headerData.add(cell.getStringCellValue());
        }
        return headerData;
    }

    public int getNumberOfLinesInFile() {
        return getWorkSheet(0).getPhysicalNumberOfRows();
    }

    private HSSFSheet getWorkSheet(int sheetIndex) {
        try {
            FileInputStream fileInputStream = new FileInputStream(testFile);
            HSSFWorkbook workbook = new HSSFWorkbook(fileInputStream);
            return workbook.getSheetAt(sheetIndex);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
