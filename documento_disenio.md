# Gestion de filas

sistema de gestion de filas para centros de atencion dental

---

### Casos de uso

Todo los posibles escenarios que podrian ocurrir

- **El paciente tiene hora agendada:**
    - Se le entregará el ticket con toda la informacion de la hora agendada

- **El paciente no tiene hora agendada:**
    - Se le dará a elegir con quien se necesita atender
    - Se le generará un registro generico en la agenda de ese dentista

- **El paciente no tiene rut:**
    - Se trabajará como si no tuviese hora agendada
    - Se le generará un rut generico indistinto a cada paciente sin rut

- **Se le genera ticket de atencion al paciente**
    - Tenga o no tenga hora el paciente, se le generará un ticket de atencion

### Casos de uso no soportados

Todo los escenarios que no deberían ocurrir

- **El paciente no tiene rut y tiene hora agendada:**
    El paciente no puede agendar hora si no tiene rut

---