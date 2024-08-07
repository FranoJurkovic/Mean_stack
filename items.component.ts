import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../item.service';

interface Item {
  _id?: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { name: '', description: '' };

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  addItem(): void {
    this.itemService.addItem(this.newItem).subscribe(item => {
      this.items.push(item);
      this.newItem = { name: '', description: '' };
    });
  }
}