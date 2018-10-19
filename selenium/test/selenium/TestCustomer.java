/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package selenium;

import selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 *
 * @author vinicius
 */
public class TestCustomer {
    
    private String nameCustomer;
    private Customer customer;
    private WebDriver driver;
    private String cityname1;
    private String cityname2;
    private WebDriverWait driverWait;
 
    public TestCustomer() {
    }    
    
    
    @Test
    public void addEmpyCity() throws Exception
    {
        customer.getDashboard().showModalAdd();
        
    }
    @Test
    public void addSearchRemoveGoBackAddEditRemoveChangePageSizeChangePagination() throws Exception
    {
        addSearchRemoveGoBackAddEditRemove();
        changepageSize(10);
        changepageSize(5);
        testPagination();
    }
    public void addEditRemove() throws Exception
    {
        addCustomer();
        editCustomer();
        removeCustomer();
    }
    public void addSearchRemove() throws Exception
    {
        addCustomer();
        searchCustomer();
        removeCustomer();
    }
    public void addSearchRemoveGoBackAddEditRemove() throws Exception
    {
        addSearchRemove();
        customer.search("");
        Helper.sleepForSeconds(2);
        addEditRemove();
        
    }
    public void addEditRemoveChangePageSizeChangePagination() throws Exception
    {
        addEditRemove();
        changepageSize(10);
        changepageSize(5);
        testPagination();
    }
    
    public void changepageSize(int size)
    {
        customer.chanceSize(size);
        Helper.sleepForSeconds(2);
        assertTrue(size == customer.getTableSize());
    }
    
    public void addCustomer() throws Exception
    {
        customer.adiciona(nameCustomer,cityname1);
        Helper.sleepForSeconds(3);
        assertTrue(customer.exist(nameCustomer,cityname1));
    }
    public void editCustomer() throws Exception
    {
        this.nameCustomer= "____"+Math.random()*100000;
        this.cityname1 = this.cityname2;
        customer.edit(nameCustomer,cityname1,0);
        Helper.sleepForSeconds(2);
        assertTrue(customer.exist(nameCustomer,cityname1));
    }
    
    public void testPagination()
    {
        assertTrue(customer.testPagination());
    }
    
    public void removeCustomer() throws Exception
    {
        customer.remove(0);
        Helper.sleepForSeconds(2);
        assertTrue(!customer.exist(nameCustomer,cityname1));
    }
    public void searchCustomer()
    {
        customer.search(nameCustomer);
        Helper.sleepForSeconds(2);
        assertTrue(customer.exist(nameCustomer,cityname1));
    }
   
    
    @Before
    public void init() throws Exception
    {
        
        
        
        System.setProperty("webdriver.chrome.driver", "/home/vinicius/Documentos/frontReactZup/selenium/src/selenium/libs/webdrivers/chromedriver");
        
        ChromeDriver driver = new ChromeDriver();
        
        driver.get("http://localhost:3000/cidades");
        new WebDriverWait(driver, 10).until(ExpectedConditions.textToBePresentInElement(By.cssSelector("tbody"), "1"));
        City city = new City(driver);
        this.cityname1 = "____"+Math.random()*100000;
        this.cityname2 = "____"+Math.random()*100000;
        city.adiciona(cityname1);
        Helper.sleepForSeconds(2);
        city.adiciona(cityname2);
        Helper.sleepForSeconds(2);
         
        
        
        
        driver.get("http://localhost:3000/clientes");
        new WebDriverWait(driver, 10).until(ExpectedConditions.textToBePresentInElement(By.cssSelector("tbody"), "1"));
        
        this.driver = driver;
        this.customer = new Customer(driver);
        this.nameCustomer= "____"+Math.random()*100000;
        this.driverWait = new WebDriverWait(driver,20);
        
    }
    
    @After
    public void close() throws Exception
    {
        driver.get("http://localhost:3000/cidades");
        new WebDriverWait(driver, 10).until(ExpectedConditions.textToBePresentInElement(By.cssSelector("tbody"), "1"));
        City city = new City(driver);
        city.remove(0);
        Helper.sleepForSeconds(2);
        city.remove(0);
        Helper.sleepForSeconds(2);
        this.driver.close();
    }
    
}
