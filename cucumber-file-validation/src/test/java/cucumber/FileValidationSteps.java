package cucumber;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import utils.ExcelFileReader;

import java.io.FileNotFoundException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Fail.fail;

public class FileValidationSteps {

    ExcelFileReader fileReader;

    @Given("a file named {string} exists")
    public void fileNamedExists(String fileName) {
        try {
            this.fileReader = new ExcelFileReader(fileName);
        } catch (FileNotFoundException e) {
            fail(String.format("File with the name %s does not exist. ", fileName));
        }
        assertThat(fileReader.isFileExists())
                .withFailMessage(String.format("File with the name %s does not exist", fileName))
                .isTrue();
    }

    @Then("Verify that header have next headers")
    public void verifyThatHeaderHaveNextHeaders(DataTable headers) {
        assertThat(fileReader.getFileHeaders())
                .withFailMessage("File doesn't contain expected headers")
                .containsExactlyElementsOf(headers.asLists().get(0));

    }

    @And("Verify that there is more than {int} lines in file")
    public void verifyThatThereIsMoreThanLinesInFile(int numOfLines) {
        assertThat(fileReader.getNumberOfLinesInFile())
                .withFailMessage("File doesn't contain expected number of lines")
                .isGreaterThan(numOfLines);
    }
}
