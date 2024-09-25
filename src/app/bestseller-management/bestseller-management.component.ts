import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Bestseller {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

@Component({
    selector: 'app-bestseller-management',
    templateUrl: './bestseller-management.component.html',
    styleUrls: ['./bestseller-management.component.css']
})
export class BestsellerManagementComponent implements OnInit {
    bestsellers: Bestseller[] = [];
    newBestseller: Bestseller = { id: '', name: '', description: '', price: 0, imageUrl: '' };
    editingBestsellerId: string | null = null;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getBestsellers();
    }

    getBestsellers(): void {
        this.http.get<Bestseller[]>('http://localhost:3000/bestseller').subscribe(data => {
            this.bestsellers = data;
        });
    }

    addBestseller(): void {
        this.http.post<Bestseller>('http://localhost:3000/bestseller', this.newBestseller).subscribe(() => {
            this.getBestsellers(); // Refresh list after adding
            this.resetForm();
        });
    }

    editBestseller(bestseller: Bestseller): void {
        this.newBestseller = { ...bestseller }; // Populate form with selected bestseller data
        this.editingBestsellerId = bestseller.id; // Track which item is being edited
    }

    updateBestseller(): void {
        if (this.editingBestsellerId) {
            this.http.put<Bestseller>(`http://localhost:3000/bestseller/${this.editingBestsellerId}`, this.newBestseller)
                .subscribe(() => {
                    this.getBestsellers(); // Refresh list after update
                    this.resetForm();
                });
        }
    }

    deleteBestseller(id: string): void {
        this.http.delete(`http://localhost:3000/bestseller/${id}`).subscribe(() => {
            this.getBestsellers(); // Refresh list after deletion
        });
    }

    resetForm(): void {
        this.newBestseller = { id: '', name: '', description: '', price: 0, imageUrl: '' };
        this.editingBestsellerId = null; // Reset editing state
    }

    canEditProducts(): boolean {
        // Replace with your logic for checking if editing is allowed
        return true;
    }

    canDeleteProducts(): boolean {
        // Replace with your logic for checking if deletion is allowed
        return true;
    }
}
