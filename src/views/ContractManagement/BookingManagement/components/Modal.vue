<template>
  <BasicModal v-bind="$attrs" title="添加预定" width="39vw">
    <Form
      :model="formState"
      layout="horizontal"
      labelAlign="left"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <Form.Item label="房源信息" required>
        <Input
          v-model:value="formState.PropertyInformation"
          placeholder="请输入房源编号/房源地址/项目名称/门牌号信息 检索房源"
        />
      </Form.Item>

      <Row :gutter="16">
        <Col :span="8">
          <Form.Item label="定金" required>
            <InputGroup compact>
              <Input v-model:value="formState.deposit" placeholder="请输入定金" />
            </InputGroup>
          </Form.Item>
        </Col>

        <Col :span="6">
          <Form.Item label="&nbsp;">
            <RadioGroup v-model:value="formState.paymentstatus" button-style="solid">
              <RadioButton value="false">未收款</RadioButton>
              <RadioButton value="true">已收款</RadioButton>
            </RadioGroup>
          </Form.Item>
        </Col>

        <Col :span="8">
          <Form.Item label="收款方式" required>
            <Cascader v-model:value="formState.paymentmethod" :options="options" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="实收时间" required>
        <DatePicker v-model:value="formState.year" style="margin-right: 8px" />
        <TimePicker v-model:value="formState.day" />
      </Form.Item>

      <p>预定人信息</p>
      <Row :gutter="16">
        <Col :span="8">
          <Form.Item label="姓名" required>
            <Input v-model:value="formState.name" placeholder="请输入姓名" />
          </Form.Item>
        </Col>

        <Col :span="6">
          <Form.Item label="&nbsp;">
            <RadioGroup v-model:value="formState.mansex" button-style="solid">
              <RadioButton value="man">先生</RadioButton>
              <RadioButton value="women">女士</RadioButton>
            </RadioGroup>
          </Form.Item>
        </Col>

        <Col :span="8">
          <Form.Item label="电话" required>
            <Input v-model:value="formState.phone" placeholder="请输入电话" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="身份信息">
        <InputGroup compact>
          <Select v-model:value="formState.id">
            <Select.Option value="身份证">身份证</Select.Option>
            <Select.Option value="护照">护照</Select.Option>
          </Select>
          <Input v-model:value="formState.idCard" style="width: 50%" />
        </InputGroup>
      </Form.Item>

      <Form.Item>
        <p>证件信息<span class="text-[#dfa755]">（附件支持格式：jpg、png、jpeg）</span></p>
        <Row align="middle" justify="start">
          <Col :span="4"><Upload IDtype="身份证正面" /></Col>
          <Col :span="4"><Upload IDtype="身份证反面" /></Col>
          <Col :span="4"><Upload IDtype="其它证件(可上传多张)" /></Col>
          <Col :span="1" style="text-align: center">或</Col>
          <Col :span="5">
            <QrCode width="100%" />
          </Col>
          <Col :span="3" style="color: #666">扫码传图使用手机扫一扫即可上传图片</Col>
        </Row>
      </Form.Item>

      <p>预定信息</p>
      <Row :gutter="16">
        <Col :span="8">
          <Form.Item label="预定类型">
            <Cascader
              v-model:value="formState.bookingtype"
              :options="bookingtypeData"
              placeholder="请选择类型"
            />
          </Form.Item>
        </Col>
        <Col :span="8">
          <Form.Item label="预计入住日期">
            <DatePicker v-model:value="formState.Checkindate" />
          </Form.Item>
        </Col>
        <Col :span="8">
          <Form.Item label="预计入住时长">
            <Cascader v-model:value="formState.LengthofStay" :options="lengthofStayData" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="备注">
        <Input.TextArea
          v-model:value="formState.notes"
          placeholder="填写后租客可见"
          maxlength="200"
        />
      </Form.Item>

      <Form.Item>
        <p>预定凭证<span class="text-[#dfa755]">（附件支持格式：jpg、png、jpeg）</span></p>
        <Row align="middle">
          <Col :span="4"> <Upload IDtype="上传图片" /></Col>
          <Col :span="1" style="text-align: center">或</Col>
          <Col :span="5">
            <QrCode width="100%" />
          </Col>
          <Col :span="3" style="color: #666">扫码传图使用手机扫一扫即可上传图片</Col>
        </Row>
      </Form.Item>

      <p>所属门店（部门）/维护人</p>
      <Row :gutter="16">
        <Col :span="8">
          <Form.Item label="所属门店（部门）" required>
            <Cascader v-model:value="formState.storeDepartment" :options="storeDepartmentOptions" />
          </Form.Item>
        </Col>
        <Col :span="8">
          <Form.Item label="维护人">
            <Cascader
              v-model:value="formState.maintenancePerson"
              :options="maintenancePersonOptions"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="8">
          <Form.Item>
            <Checkbox v-model="formState.inviteTenantSignature" /> 邀请租客签字
          </Form.Item>
        </Col>
        <Col :span="8">
          <Form.Item>
            <Cascader v-model:value="formState.signatureMethod" :options="signatureMethodOptions" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </BasicModal>
</template>

<script setup>
  import { ref } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import {
    Form,
    Input,
    Cascader,
    RadioGroup,
    RadioButton,
    DatePicker,
    TimePicker,
    Select,
    InputGroup,
    Checkbox,
    Row,
    Col,
  } from 'ant-design-vue';
  import Upload from './Upload.vue';
  import QrCode from './QrCode.vue';

  const formState = ref({
    PropertyInformation: '',
    deposit: '',
    paymentstatus: 'true',
    paymentmethod: ['现金'],
    year: '',
    day: '',
    name: '',
    mansex: 'man',
    phone: '',
    id: '身份证',
    idCard: '',
    bookingtype: '',
    Checkindate: '',
    LengthofStay: ['一年'],
    notes: '',
    storeDepartment: ['E+SPACE'],
    maintenancePerson: ['王子郭'],
    inviteTenantSignature: false,
    signatureMethod: ['没有可选模板'],
  });

  const labelCol = { span: 24 };
  const wrapperCol = { span: 24 };

  const options = [
    { value: '现金', label: '现金' },
    { value: '银行转账', label: '银行转账' },
    { value: '微信', label: '微信' },
    { value: '支付宝', label: '支付宝' },
  ];

  const bookingtypeData = [
    { value: '整租', label: '整租' },
    { value: '合租', label: '合租' },
  ];

  const lengthofStayData = [
    { value: '1个月', label: '1个月' },
    { value: '3个月', label: '3个月' },
    { value: '6个月', label: '6个月' },
    { value: '一年', label: '一年' },
  ];

  const storeDepartmentOptions = [
    { value: 'E+SPACE', label: 'E+SPACE' },
    { value: '总部', label: '总部' },
    { value: '分部A', label: '分部A' },
    { value: '分部B', label: '分部B' },
  ];

  const maintenancePersonOptions = [
    { value: '张三', label: '张三' },
    { value: '李四', label: '李四' },
    { value: '王子郭', label: '王子郭' },
  ];

  const signatureMethodOptions = [
    { value: '有可选模板', label: '有可选模板' },
    { value: '没有可选模板', label: '没有可选模板' },
  ];
</script>

<style scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
