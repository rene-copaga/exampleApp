import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { FirstComponent } from "src/app/ondemand/first.component";
import { Product } from "src/app/model/product.model";
import { Model } from "src/app/model/repository.model";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("FirstComponent", () => {
    let fixture: ComponentFixture<FirstComponent>;
    let component: FirstComponent;
    let debugElement: DebugElement;
    let spanElement: HTMLSpanElement;
    let divElement: HTMLDivElement;

    let mockRepository = {
        getProducts: function () {
            return [
                new Product(1, "test1", "Soccer", 100),
                new Product(2, "test2", "Chess", 100),
                new Product(3, "test3", "Soccer", 100),
            ]
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FirstComponent],
            providers: [
                { provide: Model, useValue: mockRepository }
            ]
        });
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(FirstComponent);
            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
            spanElement = debugElement.query(By.css("span")).nativeElement;
            divElement = debugElement.children[0].nativeElement;
        });
    }));

    it("is defined", () => {
        expect(component).toBeDefined()
    });

    it("filters categories", () => {
        component.category = "Chess";
        fixture.detectChanges();
        expect(component.getProducts().length).toBe(1);
        expect(spanElement.textContent).toContain("1");

        component.category = "Soccer";
        fixture.detectChanges();
        expect(component.getProducts().length).toBe(2);
        expect(spanElement.textContent).toContain("2");

        component.category = "Running";
        fixture.detectChanges();
        expect(component.getProducts().length).toBe(0);
        expect(spanElement.textContent).toContain("0");
    });

    it("handles mouse events", () => {
        expect(component.highlighted).toBeFalsy();
        expect(divElement.classList.contains("bg-success")).toBeFalsy();
        debugElement.triggerEventHandler("mouseenter", new Event("mouseenter"));
        fixture.detectChanges();
        expect(component.highlighted).toBeTruthy();
        expect(divElement.classList.contains("bg-success")).toBeTruthy();
        debugElement.triggerEventHandler("mouseleave", new Event("mouseleave"));
        fixture.detectChanges()
        expect(component.highlighted).toBeFalsy();
        expect(divElement.classList.contains("bg-success")).toBeFalsy();
    });

    it("implements output property", () => {
        let highlighted: boolean;
        component.change.subscribe(value => highlighted = value);
        debugElement.triggerEventHandler("mouseenter", new Event("mouseenter"));
        expect(highlighted).toBeTruthy();
        debugElement.triggerEventHandler("mouseleave", new Event("mouseleave"));
        expect(highlighted).toBeFalsy();
    });
});