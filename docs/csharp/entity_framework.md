---
sidebar_position: 3
---

# Entity Framework

[Get started with Entity Framework 6 - EF6 | Microsoft Learn](https://learn.microsoft.com/en-us/ef/ef6/get-started)

1. Add EF to the application
2. Create model
    1. Workflow: Code First Reverse Engineer Model
    2. Add New Item…
    3. Give name: EfSqlServerDbContext
    4. Prefer to uncheck “Pluralize or singularize generated object name”
3. Change the connection string on the constructor
    
```cs
public EfSqlServerDbContext(): base("name=DefaultConnection")
{
}
```
    
4. IEfGenericRepository.cs
    
```cs
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq.Expressions;

namespace GreenBox.Persistence.Data.EfRepository
{
    public interface IEfGenericRepository<T>
    {
        T GetById(int id);

        // Ref: https://stackoverflow.com/questions/22813938/entity-framework-include-and-where-clause-in-generic-repository
        IList<T> GetList(Expression<Func<T, bool>> predicate);

        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
        int Save();

        // Ref: https://learn.microsoft.com/en-us/ef/core/saving/transactions
        DbContextTransaction BeginTransaction();
    }
}
```
    
5. EfGenericRepository.cs
    
```cs
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using GreenBox.Persistence.Data.EfEntity;

namespace GreenBox.Persistence.Data.EfRepository
{
    public class EfGenericRepository<T>: IEfGenericRepository<T> where T : class
    {
        private readonly EfSqlServerDbContext _context;
        private readonly DbSet<T> _dbSet;

        public EfGenericRepository(EfSqlServerDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public T GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public IList<T> GetList(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate).ToList();
        }

        public void Insert(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public int Save()
        {
            return _context.SaveChanges();
        }

        public DbContextTransaction BeginTransaction()
        {
            return _context.Database.BeginTransaction();
        }
    }
}
```

## Error

使用 ORM 直接執行 sql commnad 的時候，db context 裡面的 states 並不會被更改，在記憶體內仍然被視為 **Unchanged** ，如果這時我們又新增一個 duplicate PK 的物件，就會產生以下error：

> The instance of entity type 'ErpInventoryMain' cannot be tracked because another instance with the key value '\{InventoryId: InventoryMain-0336d32c-6da8-4c22-a325-15e73a954a86}' is already being tracked. When attaching existing entities, ensure that only one entity instance with a given key value is attached.

```cs
try{
	await _dbContext
		.Database
		.ExecuteSqlRawAsync(
			"truncate table [dbo].[ERP-InventoryMain]",
			cancellationToken: cancellationToken
		);
	await _dbContext.SaveChangeAsync(cancellationToken);
	_dbContext.ChangeTracker.Clear();
}
```

解法是：使用 change tracker 針對 db context裡面所有的 entity 做 detach，取消 tracking。 (但這要看情境使用，在整個scope裡面有其他的entity需要操作，那不建議這這樣使用) 之後再 insert table save change就正常了