﻿namespace FoodStore.Web.DTO
{
    public class RestDTO<T>
    {
        public T Data { get; set; } = default!;
        public int? PageIndex { get; set; }
        public int? PageSize { get; set; }
        public int? RecordCount { get; set; }
        public int? TotalPage { get; set; }
        public List<LinkDTO> Links { get; set; }
    }
}
