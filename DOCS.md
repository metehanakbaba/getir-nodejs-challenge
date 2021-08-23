<a name="top"></a>
# Getir Nodejs Challenge v0.0.1



# Table of contents

- [Record](#Record)
  - [Query on record](#Query-on-record)

___


# <a name='Record'></a> Record

## <a name='Query-on-record'></a> Query on record
[Back to top](#top)

```
POST /records
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| startDate |  | <p>Minimum value (inclusive) for 'createdAt' field of Record</p> |
| endDate |  | <p>Maximum value (exclusive) for 'createdAt' field of Record</p> |
| minCount |  | <p>Minimum value (inclusive) for sum of 'counts' field of Record</p> |
| maxCount |  | <p>Maximum value (exclusive) for sum of 'counts' field of Record</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| records | `Array` | <p>Record's data.</p> |
| msg | `String` | <p>Conditional message</p> |
| code | `Number` | <p>Success code [0]</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| msg | `String` | <p>Some parameters may contain invalid values.</p> |
| code | `Number` | <p>401 Error code of Validation[3]</p> |

